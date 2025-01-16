import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

// Definir __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ahora puedes usar __dirname como en CommonJS
const filePath = path.join(__dirname, 'dist', 'index.html');
console.log(`Ruta al archivo: ${filePath}`);

// Cadena que deseas reemplazar
const searchValue = 'crossorigin src="/';
const searchValue2 = 'crossorigin href="/';
const replaceValue = 'crossorigin src="./';
const replaceValue2 = 'crossorigin href="./';


async function replaceContent() {
    try {
        // Verificar si el archivo existe
        if (!await fs.pathExists(filePath)) {
            console.error(`El archivo no existe: ${filePath}`);
            return;
        }

        // Leer el contenido del archivo
        const fileContent = await fs.readFile(filePath, 'utf8');

        // Reemplazar el contenido
        const updatedContent = fileContent.replace(searchValue, replaceValue).replace(searchValue2, replaceValue2);

        // Guardar el archivo actualizado
        await fs.writeFile(filePath, updatedContent, 'utf8');

        console.log(`Reemplazo completado en ${filePath}`);
    } catch (err) {
        console.error(`Error procesando el archivo: ${err.message}`);
    }
}

// Ejecutar la función
replaceContent();
