'use server'

import { pool } from "@/utils/database/postgres"
import { validateAuth } from "@/utils/lucia"
import { revalidatePath } from "next/cache"
import { mkdir, rm, writeFile } from "node:fs/promises"
import { join } from "node:path"

export async function addNewVenue(formData: FormData) {
    const name = formData.get('name') as string
    const address = formData.get('address') as string
    const images = formData.getAll('images') as File[]

    const client = await pool.connect()
    try {
        await client.query('BEGIN')

        const { user } = await validateAuth();
        const addedVenue = await client.query(
            'INSERT INTO venues (user_id, name, address) VALUES ($1, $2, $3) RETURNING id',
            [user.id, name, address]
        )
        const venueId = addedVenue.rows[0].id // Retrieve the generated UUID

        for (const image of images) {
            if (image.size === 0) continue // Skip empty files

            const filename = image.name

            // 1. Determine the directory path
            const relativeUploadDir = join('uploads', 'venues', venueId); // Relative to the 'public' directory
            const uploadDir = join(process.cwd(), '.data', relativeUploadDir);

            // 2. Create the directory if it doesn't exist
            await mkdir(uploadDir, { recursive: true });

            // 3. Construct the full file path
            const fullFilePath = join(uploadDir, filename);


            // 4. Write the file to the filesystem
            const buffer = Buffer.from(await image.arrayBuffer());
            await writeFile(fullFilePath, buffer);

        }
        await client.query('COMMIT')
    } catch (err) {
        await client.query('ROLLBACK')
        throw new err()
    } finally {
        client.release()
        revalidatePath('/my-venues')
    }
}

export async function deleteVenue(formData: FormData) {
    const id = formData.get('id') as string
    const client = await pool.connect()
    try {
        await client.query('BEGIN')

        await client.query('DELETE FROM venues WHERE id = $1', [id])

        // 1. Determine the directory path
        const relativeUploadDir = join('uploads', 'venues', id); // Relative to the 'public' directory
        const uploadDir = join(process.cwd(), '.data', relativeUploadDir);

        await rm(uploadDir, { recursive: true, force: true });
        await client.query('COMMIT')
    } catch (err) {
        await client.query('ROLLBACK')
        throw new err()
    } finally {
        client.release()
        revalidatePath('/my-venues')
    }
}