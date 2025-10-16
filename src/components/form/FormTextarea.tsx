"use client";

import type { Control, FieldValue, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type FormTextareaProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	description?: React.ReactNode;
	placeholder?: string;
	label: string;
	className?: string;
	disabled?: boolean;
	defaultValue?: FieldValue<T>;
};

const FormTextarea = <T extends FieldValues>({
	control,
	name,
	description,
	label,
	placeholder,
	className,
	disabled,
	defaultValue,
}: FormTextareaProps<T>) => {
	return (
		<Controller
			control={control}
			name={name}
			disabled={disabled}
			defaultValue={defaultValue}
			render={({
				fieldState,
				field: { disabled, ...field },
				formState: { isLoading, isSubmitting },
			}) => (
				<Field data-invalid={fieldState.invalid}>
					<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
					<Textarea
						id={field.name}
						placeholder={placeholder}
						className={cn("resize-none", className)}
						disabled={disabled || isLoading || isSubmitting}
						{...field}
					/>
					{!!description && <FieldDescription>{description}</FieldDescription>}
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
};

export default FormTextarea;
