"use client";

import type { Control, FieldValue, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type FormSelectProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	description?: React.ReactNode;
	placeholder?: string;
	label: string;
	className?: string;
	defaultValue?: FieldValue<T>;
	options: (
		| {
				label: string;
				value: string | number | null;
		  }
		| string
	)[];
	disabled?: boolean;
	onChange?: (value: string) => void;
};

const FormSelect = <T extends FieldValues>({
	description,
	control,
	label,
	placeholder,
	name,
	options,
	disabled,
	defaultValue,
	onChange,
}: FormSelectProps<T>) => {
	const isNumber =
		typeof options[0] === "object"
			? typeof options[0].value === "number"
			: typeof options[0] === "number";

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
				<Field orientation="responsive" aria-inavlid={fieldState.invalid}>
					<FieldContent>
						<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
						<FieldDescription>{description}</FieldDescription>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</FieldContent>
					<Select
						onValueChange={(value) =>
							onChange
								? onChange(value)
								: field.onChange(isNumber ? Number(value) : value)
						}
						value={String(field.value)}
						disabled={disabled || isLoading || isSubmitting}
					>
						<SelectTrigger aria-invalid={fieldState.invalid} id={field.name}>
							<SelectValue placeholder={placeholder ?? "Select"} />
						</SelectTrigger>
						<SelectContent position="item-aligned">
							{options.map((option) => {
								const value =
									typeof option === "string" ? option : option.value;
								const label =
									typeof option === "string" ? option : option.label;
								return (
									<SelectItem key={value} value={String(value)}>
										{label}
									</SelectItem>
								);
							})}
						</SelectContent>
					</Select>
				</Field>
			)}
		/>
	);
};

export default FormSelect;
