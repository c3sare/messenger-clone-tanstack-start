"use client";

import type { Control, FieldValue, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

type FormInput<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	description?: React.ReactNode;
	label: string;
	className?: string;
	disabled?: boolean;
	defaultValue?: FieldValue<T>;
	title: string;
};

const FormCheckbox = <T extends FieldValues>({
	control,
	name,
	description,
	label,
	className,
	disabled,
	defaultValue,
	title,
}: FormInput<T>) => {
	return (
		<Controller
			control={control}
			name={name}
			disabled={disabled}
			defaultValue={defaultValue}
			render={({
				field: { value, onChange, disabled, ...rest },
				fieldState,
				formState: { isLoading, isSubmitting },
			}) => (
				<FieldSet data-invalid={fieldState.invalid}>
					<FieldLegend variant="label">{title}</FieldLegend>
					<FieldDescription>{description}</FieldDescription>
					<FieldGroup data-slot="checkbox-group">
						<Field
							data-invalid={fieldState.invalid}
							className={cn(
								"flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow",
								className,
							)}
						>
							<Checkbox
								id={rest.name}
								checked={value}
								onCheckedChange={onChange}
								disabled={disabled || isLoading || isSubmitting}
								{...rest}
							/>
							<FieldLabel htmlFor={rest.name} className="font-normal">
								{label}
							</FieldLabel>
						</Field>
					</FieldGroup>
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</FieldSet>
			)}
		/>
	);
};

export default FormCheckbox;
