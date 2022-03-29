import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
export { FORM_ERROR } from "app/core/components/Form"

export function FeedbackForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  return (
    <Form<S> {...props}>
      <LabeledTextField bg="white" required name="title" label="Title" placeholder="Name" />
      <LabeledTextField
        bg="white"
        required
        name="email"
        label="Email"
        placeholder="something@example.com"
        type="email"
      />
      <LabeledTextField
        required
        componentType="textarea"
        bg="white"
        name="text"
        label="Write Your Feedback"
        placeholder="Text"
      />
    </Form>
  )
}
