"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { useValibotForm } from "@/hooks/useValibotForm";
import { registerSchema } from "@/validators/auth/registerSchema";
// import { registerUser } from "@/actions/auth/register";
// import { toast } from "sonner";

export const RegisterForm = () => {
	const form = useValibotForm({
		schema: registerSchema,
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		// const request = await registerUser(data);
		// const response = request?.data;
		// if (response?.success) {
		//   form.reset();
		//   toast.success("User created successfully");
		// } else if (response?.field) {
		//   form.setError(response.field, { message: response.message });
		// } else {
		//   toast.error(response?.message || "Something went wrong");
		// }
	});

	return (
		<form onSubmit={onSubmit}>
			<FieldGroup>
				<FormInput control={form.control} name="name" label="Name" />
				<FormInput control={form.control} name="email" label="E-mail" />
				<FormInput
					control={form.control}
					name="password"
					label="Password"
					type="password"
				/>
			</FieldGroup>
			<Button disabled={form.disabledSubmit} type="submit" className="w-full">
				Register
			</Button>
		</form>
	);
};
