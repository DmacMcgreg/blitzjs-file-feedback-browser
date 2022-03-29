const Busboy = require("busboy");
const fs = require("fs");
const { join, basename } = require("path");
const {
	createNewRoot,
	getDirectoryFiles,
	getFilesStructure,
	isFile,
	getFolderInfo,
	getFilesForZip,
	remove,
	create,
	rename,
} = require("./helper");

module.exports = function (app, express) {
	// authorization
	app.get("/backend/authorization", (req, res) => {
		const path = req.query.path;
		if (path) {
			createNewRoot(path);
			res.status(200).end();
		} else {
			res.status(404).end();
		}
	});

	// download
	app.get("/backend/download", (req, res) => {
		const path = req.query.path;
		if (isFile(path)) {
			res.status(200).download(join(__dirname, path));
		} else {
			res.status(200).zip({
				files: getFilesForZip(path),
				filename: basename(path) + ".zip",
			});
		}
	});

	// files list
	app.get("/backend/files", (req, res) => {
		const path = req.query.path;
		if (path) {
			createNewRoot(path).then(() => {
				res.status(200).json(getDirectoryFiles(path));
			});
		} else {
			res.status(404).end();
		}
	});

	// folder list
	app.get("/backend/folders", (req, res) => {
		const path = req.query.path;
		const foldersStructure = getFilesStructure(req.query.key, path);
		if (foldersStructure) {
			res.status(200).json(foldersStructure);
		} else {
			res.status(404).end();
		}
	});

	// remove
	app.delete("/backend", (req, res) => {
		const body = req.body;
		if (remove(body.path, body.isFolder)) {
			res.status(200).json({ id: body.id });
		} else {
			res.status(404).end();
		}
	});

	// create
	app.put("/backend", (req, res) => {
		const { path, ...obj } = req.body;
		const createObj = create(path, obj.value, obj.isFolder);

		if (createObj.error) {
			res.status(500).json(createObj.error);
		} else {
			const { id, name } = createObj;
			res.status(200).json({ id, value: name, name });
		}
	});

	// rename
	app.post("/backend", (req, res) => {
		const body = req.body;
		const path = body.path;
		const value = body.value || body.name;
		const old = body.old;
		if (rename(path, old, value)) {
			res.status(200).json({ value, name: value });
		} else {
			res.status(404).end();
		}
	});

	// folder info
	app.get("/backend/info", (req, res) => {
		const path = req.query.path;
		const info = getFolderInfo(path);
		if (info) {
			res.status(200).json(info);
		} else {
			res.status(404).end();
		}
	});

	//upload files
	app.post("/backend/upload", (req, res) => {
		if (req.method === "POST") {
			let pathTo = null;
			const busboy = new Busboy({ headers: req.headers });
			const response = {};

			busboy.on("file", (fieldname, file, filename) => {
				if (pathTo) {
					file.pipe(fs.createWriteStream(join(__dirname, "", pathTo, filename)));
				}
			});

			busboy.on("field", (fieldname, val) => {
				if (fieldname === "path") {
					pathTo = val;
				}
			});

			busboy.on("finish", () => {
				res.json(response);
			});

			return req.pipe(busboy);
		}
		res.status(404).end();
	});
};
