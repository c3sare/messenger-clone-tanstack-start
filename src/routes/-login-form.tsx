"use client";

import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { useValibotForm } from "@/hooks/useValibotForm";
import { signInSchema } from "@/validators/auth/signInSchema";
// import { signInWithCredentials } from "@/actions/auth/signInWithCredentials";
// import { toast } from "sonner";

export const LoginForm = () => {
	const form = useValibotForm({
		schema: signInSchema,
	});

	const onSubmit = form.handleSubmit(async (data) => {
		// const request = await signInWithCredentials(data);
		// const response = request?.data;
		// if (typeof response?.success === "boolean") toast.error(response.message);
	});

	return (
		<form onSubmit={onSubmit}>
			<FieldGroup>
				<FormInput control={form.control} name="email" label="E-mail" />
				<FormInput
					control={form.control}
					name="password"
					label="Password"
					type="password"
				/>
				<Field>
					<Button
						disabled={form.disabledSubmit}
						type="submit"
						className="w-full"
					>
						Sign in
					</Button>
				</Field>
			</FieldGroup>
		</form>
	);
};
