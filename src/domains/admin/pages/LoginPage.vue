<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useAuth } from "../composables/useAuth";
import { adminLoginSchema } from "@/schemas/adminLogin";
import { useForm } from "vee-validate";

import {
	TheCard,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { TheInput } from "@/components/ui/input";
import { TheButton } from "@/components/ui/button";

const { login, isSubmitting } = useAuth();

const formSchema = toTypedSchema(adminLoginSchema);
const form = useForm({
	validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async(values) => {
	isSubmitting.value = true;
	try {
		await login(values);
	} finally {
		isSubmitting.value = false;
	}
});
</script>

<template>
  <section class="min-h-screen-nh flex justify-center items-center">
    <TheCard class="w-full mx-auto max-w-xs">
      <CardHeader>
        <CardTitle class="text-2xl">
          Connexion admin
        </CardTitle>
        <CardDescription>
          Connectez-vous pour accéder à l'espace admin.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          @submit="onSubmit"
          class="grid gap-4"
        >
          <FormField
            v-slot="{ componentField }"
            name="email"
          >
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <TheInput
                  type="email"
                  autocomplete="username"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            name="password"
          >
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <TheInput
                  type="password"
                  autocomplete="current-password"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <TheButton
            type="submit"
            class="w-full"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Connexion en cours...' : 'Se connecter' }}
          </TheButton>
        </form>
      </CardContent>
    </TheCard>
  </section>
</template>
