"use client";

import { Image } from "@unpic/react";
import { CldUploadButton } from "next-cloudinary";
import { toast } from "sonner";
import { updateSettings } from "@/actions/mutations/updateSettings";
import type { user } from "@/drizzle/schema";
import { env } from "@/env";
import { useValibotForm } from "@/hooks/useValibotForm";
import { settingSchema } from "@/validators/settingSchema";
import { FormInput } from "../form/FormInput";
import { Button } from "../ui/button";
import { FieldGroup } from "../ui/field";

type SettingsModalProps = {
	currentUser: typeof user.$inferSelect;
};

const SettingsModal: React.FC<SettingsModalProps> = ({ currentUser }) => {
	const form = useValibotForm({
		schema: settingSchema,
		defaultValues: {
			name: currentUser?.name ?? "",
			image: currentUser?.image,
		},
	});

	const image = form.watch("image");

	const onSubmit = form.handleSubmit(async (data) => {
		const request = await updateSettings({ data });

		if (request?.success) {
			toast.success("Settings updated successfully!");
		} else {
			toast.error("Something went wrong!");
		}
	});

	return (
		<form onSubmit={onSubmit}>
			<div className="border-b border-gray-900/10 pb-6">
				<FieldGroup className="flex flex-col gap-y-8">
					<FormInput control={form.control} label="Name" name="name" />
					<div>
						<span className="block text-sm font-medium leading-6 text-gray-900">
							Photo
						</span>
						<div className="mt-2 flex items-center gap-x-3">
							<Image
								width={48}
								height={48}
								className="rounded-full"
								src={image || currentUser?.image || "/images/placeholder.jpg"}
								alt="Avatar"
							/>
							<CldUploadButton
								options={{ maxFiles: 1 }}
								onSuccess={(result) => {
									const info = result?.info;
									if (typeof info === "undefined" || typeof info === "string")
										return;

									form.setValue("image", info.secure_url, {
										shouldValidate: true,
									});
								}}
								uploadPreset={env.VITE_CLOUDINARY_UPLOAD_PRESET}
							>
								<Button variant="secondary" type="button">
									Change
								</Button>
							</CldUploadButton>
						</div>
					</div>
				</FieldGroup>
			</div>
			<div className="mt-6 flex items-center justify-end gap-x-6">
				<Button disabled={form.disabledSubmit} type="submit">
					Save
				</Button>
			</div>
		</form>
	);
};

export default SettingsModal;
