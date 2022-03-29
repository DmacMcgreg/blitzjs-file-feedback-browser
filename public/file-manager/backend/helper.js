const fs = require("fs");
const fsExtra = require("fs-extra");
const mime = require("mime");
const join = require("path").join;
const crypto = require("crypto");

const rootPath = join(__dirname, "root");

function getFilesStructure(key, path = rootPath + "_" + key) {
	return fs.readdirSync(path).reduce((arr, name) => {
		const fpath = join(path, name);
		const stats = fs.statSync(fpath);
		const isFolder = stats.isDirectory();

		if (isFolder) {
			const obj = {
				id: stats.ino.toString(),
				isFolder,
				value: name,
				modified: pretyDate(stats.mtime),
			};
			const fileStructure = getFilesStructure(key, fpath);
			if (fileStructure.length) {
				obj.items = fileStructure;
			}

			arr.push(obj);
		}

		return arr;
	}, []);
}

function getFilesForZip(path) {
	path = join(__dirname, path);
	const list = fs.readdirSync(path);
	const files = [];
	for (const item of list) {
		const itemPath = join(path, item);
		const itemStats = fs.statSync(itemPath);
		if (itemStats.isFile()) {
			files.push({ path: itemPath, name: item });
		}
	}
	return files;
}

// if this name already exist return new name
function create(path, name, isFolder) {
	const newPath = join(__dirname, path, name);
	if (fs.existsSync(newPath)) {
		return {
			error: "File already exist",
		};
	}

	if (isFolder) {
		fs.mkdirSync(newPath);
	} else {
		fs.writeFileSync(newPath, "");
	}
	const stats = fs.statSync(newPath);

	return {
		name,
		id: stats.ino.toString(),
	};
}

function isFile(path) {
	const stats = fs.statSync(join(__dirname, path));
	return stats.isFile();
}

function getDirectoryFiles(path) {
	path = join(__dirname, path);
	return fs.readdirSync(path).reduce((arr, name) => {
		const fpath = join(path, name);
		const stats = fs.statSync(fpath);
		const mimeType = mime.getType(name) || "";
		if (stats.isFile()) {
			arr.push({
				id: stats.ino.toString(),
				value: name,
				name,
				size: stats.size,
				modified: pretyDate(stats.mtime),
				created: pretyDate(stats.ctime),
				type: mimeType,
				url: "./backend/download?path=" + encodeURI(fpath.replace(__dirname, "")),
			});
		}
		return arr;
	}, []);
}

function rename(path, old, name) {
	const oldPath = join(__dirname, path, old);
	const newPath = join(__dirname, path, name);

	if (oldPath === newPath) {
		return true;
	}

	if (!path || !fs.existsSync(oldPath) || fs.existsSync(newPath)) {
		return false;
	}

	fs.renameSync(oldPath, newPath);
	return true;
}

function remove(path, isFolder) {
	path = join(__dirname, path);
	try {
		if (isFolder) {
			deleteFolderRecursive(path);
		} else {
			fs.unlinkSync(path);
		}
		return true;
	} catch (e) {
		return false;
	}
}

function pretyDate(date) {
	const d = date.getDate();
	const m = date.getMonth() + 1;
	const y = date.getFullYear();
	return `${d < 10 ? "0" + d : d}-${m < 10 ? "0" + m : m}-${y}`;
}

function deleteFolderRecursive(path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach(file => {
			const curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) {
				deleteFolderRecursive(curPath);
			} else {
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
}

function getFolderInfo(path) {
	const fullPath = join(__dirname, path);
	const stats = fs.statSync(fullPath);
	if (stats.isFile()) {
		return;
	}
	const list = fs.readdirSync(fullPath);
	const result = { size: 0, count: 0, url: "./backend/download?path=" + path };
	for (const item of list) {
		const itemStats = fs.statSync(join(fullPath, item));
		if (itemStats.isFile()) {
			result.size += itemStats.size;
			result.count += 1;
		}
	}
	return result;
}

function createNewRoot(path) {
	return new Promise(resolve => {
		if (!fs.existsSync(path)) {
			const fullPath = join(__dirname, "root/");
			fs.mkdirSync(path);
			if (fs.lstatSync(path).isDirectory()) {
				fsExtra.copySync(fullPath, path);
			}
		}
		resolve();
	});
}

module.exports = {
	remove,
	rename,
	getDirectoryFiles,
	getFilesStructure,
	create,
	isFile,
	getFolderInfo,
	getFilesForZip,
	createNewRoot,
};
