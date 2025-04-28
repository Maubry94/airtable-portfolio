<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useAuth } from "../composables/useAuth";
import { adminLoginSchema } from "@/schemas/adminLogin";
import { useForm } from "vee-validate";
import { ref } from "vue";

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

const { login } = useAuth();
const isSubmitting = ref(false);

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
  <section class="h-[calc(100vh-2*2rem)] flex justify-center items-center">
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
