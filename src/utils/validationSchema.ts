import z from 'zod';

export const toDoForm = z.object({
    todo: z.string().min(3, 'Inserire almeno tre caratteri'),
});

export const validateForm = (data: unknown) => {
    const validation = toDoForm.safeParse(data);
    if (validation.success) {
        return {
            success: true as const,
            error: null
        }
    }
    return {
        success: false as const,
        error: validation.error.errors.map((error) => error.message)
    }
};