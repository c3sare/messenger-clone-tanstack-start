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
import { Switch } from "@/components/ui/switch";

type FormSwitchProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	description?: React.ReactNode;
	label: string;
	className?: string;
	disabled?: boolean;
	defaultValue?: FieldValue<T>;
};

const FormSwitch = <T extends FieldValues>({
	control,
	name,
	description,
	label,
	className,
	disabled,
	defaultValue,
}: FormSwitchProps<T>) => {
	return (
		<Controller
			control={control}
			name={name}
			disabled={disabled}
			defaultValue={defaultValue}
			render={({
				fieldState,
				field: { value, onChange, disabled, ...rest },
				formState: { isLoading, isSubmitting },
			}) => (
				<Field className={className}>
					<FieldContent>
						<FieldLabel htmlFor={name}>{label}</FieldLabel>
						<FieldDescription>{description}</FieldDescription>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</FieldContent>
					<Switch
						id={name}
						checked={value}
						onCheckedChange={onChange}
						disabled={disabled || isLoading || isSubmitting}
						{...rest}
					/>
				</Field>
			)}
		/>
	);
};

export default FormSwitch;
