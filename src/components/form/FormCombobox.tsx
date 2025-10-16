"use client";

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import type { Control, FieldValue, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@/components/ui/command";
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

type FormComboboxProps<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	placeholder?: string;
	label: string;
	description?: React.ReactNode;
	options: {
		value: FieldValue<T>;
		label: string;
	}[];
	disabled?: boolean;
	defaultValue?: FieldValue<T>;
};

const FormCombobox = <T extends FieldValues>({
	control,
	name,
	placeholder,
	label,
	description,
	options,
	disabled,
	defaultValue,
}: FormComboboxProps<T>) => {
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
				<Field orientation="responsive" aria-invalid={fieldState.invalid}>
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
								name={field.name}
								variant="outline"
								role="combobox"
								className={cn(
									"justify-between",
									!field.value && "text-muted-foreground",
								)}
							>
								{field.value
									? options.find((option) => option.value === field.value)
											?.label
									: placeholder}
								<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-[200px] p-0">
							<Command>
								<CommandInput
									placeholder="Search..."
									className="h-9"
									onBlur={field.onBlur}
								/>
								<CommandEmpty>No results found.</CommandEmpty>
								<CommandGroup>
									{options.map((option) => (
										<CommandItem
											value={option.label}
											key={option.value}
											onSelect={() => {
												field.onChange(name, option.value);
											}}
										>
											{option.label}
											<CheckIcon
												className={cn(
													"ml-auto h-4 w-4",
													option.value === field.value
														? "opacity-100"
														: "opacity-0",
												)}
											/>
										</CommandItem>
									))}
								</CommandGroup>
							</Command>
						</PopoverContent>
					</Popover>
				</Field>
			)}
		/>
	);
};

export default FormCombobox;
