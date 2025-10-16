"use client";

import type { Control, FieldValue, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSet,
	FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type FormInput<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	description?: React.ReactNode;
	label: string;
	className?: string;
	defaultValue?: FieldValue<T>;
	options: (
		| {
				value: string;
				label: string;
				description?: string;
		  }
		| string
	)[];
	disabled?: boolean;
};

const FormRadioGroup = <T extends FieldValues>({
	control,
	name,
	label,
	className,
	options,
	disabled,
	defaultValue,
	description,
}: FormInput<T>) => {
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
				<FieldGroup className={className}>
					<FieldSet data-invalid={fieldState.invalid}>
						<FieldLegend>{label}</FieldLegend>
						<FieldDescription>{description}</FieldDescription>
						<Field className="space-y-3">
							<RadioGroup
								name={field.name}
								onValueChange={field.onChange}
								value={field.value}
								disabled={disabled || isLoading || isSubmitting}
								aria-invalid={fieldState.invalid}
							>
								{options.map((option) => {
									const value =
										typeof option === "string" ? option : option.value;
									const label =
										typeof option === "string" ? option : option.label;
									const description =
										typeof option === "string" ? undefined : option.description;
									return (
										<FieldLabel key={value} htmlFor={`${field.name}-${value}`}>
											<Field
												orientation="horizontal"
												data-invalid={fieldState.invalid}
											>
												<FieldContent>
													<FieldTitle>{label}</FieldTitle>
													<FieldDescription>{description}</FieldDescription>
												</FieldContent>
												<RadioGroupItem
													value={value}
													id={`${field.name}-${value}`}
													aria-invalid={fieldState.invalid}
												/>
											</Field>
										</FieldLabel>
									);
								})}
							</RadioGroup>
						</Field>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</FieldSet>
				</FieldGroup>
			)}
		/>
	);
};

export default FormRadioGroup;
