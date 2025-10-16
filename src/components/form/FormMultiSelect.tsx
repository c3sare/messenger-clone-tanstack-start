"use client";

import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { MultiSelect } from "@/components/ui/multi-select";

type FormMultiSelect<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	description?: React.ReactNode;
	placeholder?: string;
	label: string;
	className?: string;
	disabled?: boolean;
	defaultValue?: PathValue<T, Path<T>>;
	onChange?: (value: string[]) => void;
	options: {
		value: string;
		label: string;
	}[];
};

export const FormMultiSelect = <T extends FieldValues>({
	control,
	name,
	description,
	placeholder,
	label,
	className,
	disabled,
	defaultValue,
	onChange,
	options,
}: FormMultiSelect<T>) => {
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
				<Field className={className}>
					<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
					<MultiSelect
						id={field.name}
						placeholder={placeholder}
						disabled={disabled || isLoading || isSubmitting}
						{...field}
						defaultValue={field.value}
						options={options}
						onValueChange={(value) => {
							void field.onChange(value);
							if (onChange) {
								onChange(value);
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
