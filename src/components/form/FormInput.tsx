"use client";

import type { InputHTMLAttributes } from "react";
import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type FormInput<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	description?: React.ReactNode;
	placeholder?: string;
	label: string;
	type?: InputHTMLAttributes<HTMLInputElement>["type"];
	className?: string;
	autoComplete?: string;
	onChange?: (value: string) => void;
	disabled?: boolean;
	defaultValue?: PathValue<T, Path<T>>;
};

export const FormInput = <T extends FieldValues>({
	control,
	name,
	description,
	placeholder,
	label,
	type,
	className,
	autoComplete,
	onChange,
	disabled,
	defaultValue,
}: FormInput<T>) => {
	return (
		<Controller
			control={control}
			name={name}
			disabled={disabled}
			defaultValue={defaultValue}
			render={({
				field: { disabled, ...field },
				fieldState,
				formState: { isLoading, isSubmitting },
			}) => (
				<Field data-invalid={fieldState.invalid} className={className}>
					<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
					<Input
						id={field.name}
						type={type}
						placeholder={placeholder}
						autoComplete={autoComplete}
						disabled={disabled || isLoading || isSubmitting}
						{...field}
						onChange={(e) => {
							void field.onChange(e);
							if (onChange) {
								onChange(e.target.value);
							}
						}}
					/>
					{!!description && <FieldDescription>{description}</FieldDescription>}
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
};
