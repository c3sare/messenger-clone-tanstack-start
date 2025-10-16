import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMemo } from "react";
import { type FieldValues, type UseFormProps, useForm } from "react-hook-form";
import type { BaseIssue, BaseSchema } from "valibot";

type PropsType<TFormValues extends FieldValues> = Omit<
	UseFormProps<TFormValues>,
	"resolver"
> & {
	schema: BaseSchema<TFormValues, TFormValues, BaseIssue<unknown>>;
};

export const useValibotForm = <TFormValues extends FieldValues>({
	schema,
	...props
}: PropsType<TFormValues>) => {
	const form = useForm<TFormValues>({
		resolver: valibotResolver(schema),
		...props,
	});

	const { isDirty, isLoading, isSubmitting, isValidating } = form.formState;

	const disabledSubmit = useMemo(
		() => !isDirty || isLoading || isSubmitting || isValidating,
		[isDirty, isLoading, isSubmitting, isValidating],
	);

	return { ...form, disabledSubmit };
};
