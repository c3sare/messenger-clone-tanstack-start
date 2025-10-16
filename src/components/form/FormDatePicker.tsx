"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type FormDatePickerProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	label: string;
	placeholder?: string;
	description?: React.ReactNode;
	disabled?: boolean;
};

const FormDatePicker = <T extends FieldValues>({
	control,
	name,
	label,
	placeholder,
	description,
	disabled,
}: FormDatePickerProps<T>) => {
	return (
		<Controller
			control={control}
			name={name}
			disabled={disabled}
			render={({
				field: { disabled, ...field },
				formState: { isLoading, isSubmitting },
				fieldState,
			}) => (
				<Field orientation="responsive" data-invalid={fieldState.invalid}>
					<FieldContent>
						<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
						<FieldDescription>{description}</FieldDescription>
						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</FieldContent>
					<Popover>
						<PopoverTrigger
							asChild
							disabled={disabled || isLoading || isSubmitting}
						>
							<Button
								id={field.name}
								variant="outline"
								className={cn(
									"pl-3 text-left font-normal",
									!field.value && "text-muted-foreground",
								)}
							>
								{field.value ? (
									format(field.value, "PPP")
								) : (
									<span>{placeholder ?? "Pick a date"}</span>
								)}
								<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								mode="single"
								selected={field.value}
								onSelect={field.onChange}
								disabled={(date) =>
									date > new Date() || date < new Date("1900-01-01")
								}
								autoFocus
							/>
						</PopoverContent>
					</Popover>
				</Field>
			)}
		/>
	);
};

export default FormDatePicker;
