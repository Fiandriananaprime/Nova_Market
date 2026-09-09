
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
 * Le script se trouve dans :
 *
 * src/script/i18n-sync.mjs
 *
 * ../ = src/
 */
const SRC_DIR = path.resolve(__dirname, '..');

const I18N_DIR = path.join(
  SRC_DIR,
  'i18n',
  'locales'
);

const EN_FILE = path.join(I18N_DIR, 'en.json');
const FR_FILE = path.join(I18N_DIR, 'fr.json');

const SOURCE_EXTENSIONS = new Set([
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
]);

/* -------------------------------------------------------------------------- */
/* JSON                                                                       */
/* -------------------------------------------------------------------------- */

function readJson(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return {};
  }

  try {
    return JSON.parse(
      fs.readFileSync(filePath, 'utf8')
    );
  } catch (error) {
    console.error(`❌ Invalid JSON: ${filePath}`);
    throw error;
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(
    filePath,
    `${JSON.stringify(data, null, 2)}\n`,
    'utf8'
  );
}

/* -------------------------------------------------------------------------- */
/* FILE SCANNER                                                               */
/* -------------------------------------------------------------------------- */

function getAllSourceFiles(dir) {
  const files = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  for (const entry of fs.readdirSync(dir, {
    withFileTypes: true,
  })) {
    const fullPath = path.join(
      dir,
      entry.name
    );

    if (entry.isDirectory()) {
      /*
       * Dossiers à ignorer
       */
      if (
        entry.name === 'node_modules' ||
        entry.name === 'dist' ||
        entry.name === 'build'
      ) {
        continue;
      }

      files.push(
        ...getAllSourceFiles(fullPath)
      );

      continue;
    }

    if (
      SOURCE_EXTENSIONS.has(
        path.extname(entry.name)
      )
    ) {
      files.push(fullPath);
    }
  }

  return files;
}

/* -------------------------------------------------------------------------- */
/* TRANSLATION KEY EXTRACTION                                                 */
/* -------------------------------------------------------------------------- */

function extractTranslationKeys(content) {
  const keys = new Set();

  /*
   * Détecte :
   *
   * t("Admin")
   * t('Admin')
   * t(`Admin`)
   *
   * i18n.t("Admin")
   * i18n.t('Admin')
   * i18n.t(`Admin`)
   */
  const regex =
    /(?:\bt|\bi18n\.t)\(\s*(['"`])((?:(?!\1).)*)\1\s*\)/g;

  let match;

  while (
    (match = regex.exec(content)) !== null
  ) {
    const key = match[2].trim();

    if (key) {
      keys.add(key);
    }
  }

  return keys;
}

/* -------------------------------------------------------------------------- */
/* COLLECT ALL KEYS                                                           */
/* -------------------------------------------------------------------------- */

function collectUsedKeys() {
  const files =
    getAllSourceFiles(SRC_DIR);

  const keys = new Set();

  for (const file of files) {
    const content =
      fs.readFileSync(
        file,
        'utf8'
      );

    const fileKeys =
      extractTranslationKeys(content);

    for (const key of fileKeys) {
      keys.add(key);
    }
  }

  return {
    files,
    keys,
  };
}

/* -------------------------------------------------------------------------- */
/* CLI                                                                         */
/* -------------------------------------------------------------------------- */

function ask(rl, question) {
  return new Promise((resolve) => {
    rl.question(
      question,
      (answer) => {
        resolve(
          answer.trim()
        );
      }
    );
  });
}

/* -------------------------------------------------------------------------- */
/* MAIN                                                                        */
/* -------------------------------------------------------------------------- */

async function main() {
  console.log(
    '\n🔍 Scanning src/...\n'
  );

  const {
    files,
    keys,
  } = collectUsedKeys();

  console.log(
    `📂 Files scanned: ${files.length}`
  );

  console.log(
    `🔑 Translation keys found: ${keys.size}\n`
  );

  const en =
    readJson(EN_FILE);

  const fr =
    readJson(FR_FILE);

  /* ---------------------------------------------------------------------- */
  /* 1. Ajouter les clés manquantes dans en.json                            */
  /* ---------------------------------------------------------------------- */

  let addedToEn = 0;

  for (const key of keys) {
    if (!(key in en)) {
      en[key] = key;
      addedToEn++;
    }
  }

  if (addedToEn > 0) {
    writeJson(
      EN_FILE,
      en
    );

    console.log(
      `✅ ${addedToEn} key(s) added to en.json\n`
    );
  }

  /* ---------------------------------------------------------------------- */
  /* 2. Trouver les traductions FR manquantes                               */
  /* ---------------------------------------------------------------------- */

  const missingTranslations = [];

  for (const key of keys) {
    const english = en[key];
    const french = fr[key];

    /*
     * IMPORTANT :
     *
     * On considère une traduction manquante uniquement si :
     *
     * - la clé n'existe pas
     * - ou la valeur est vide
     * - ou la valeur est null / undefined
     *
     * Donc :
     *
     * "Promotions": "Promotions"
     *
     * n'est PAS considéré comme manquant.
     */
    const missing =
      !(key in fr) ||
      french === '' ||
      french == null;

    if (missing) {
      missingTranslations.push({
        key,
        english,
      });
    }
  }

  /* ---------------------------------------------------------------------- */
  /* 3. Rien à traduire                                                     */
  /* ---------------------------------------------------------------------- */

  if (
    missingTranslations.length === 0
  ) {
    console.log(
      '✅ All French translations are up to date.\n'
    );

    return;
  }

  console.log(
    `🇫🇷 ${missingTranslations.length} missing translation(s).\n`
  );

  /* ---------------------------------------------------------------------- */
  /* 4. Interface interactive                                                */
  /* ---------------------------------------------------------------------- */

  const rl =
    readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

  try {
    for (
      let i = 0;
      i < missingTranslations.length;
      i++
    ) {
      const item =
        missingTranslations[i];

      const remaining =
        missingTranslations.length - i;

      console.log(
        '----------------------------------------'
      );

      console.log(
        `🇫🇷 Remaining: ${remaining}`
      );

      console.log(
        `English : ${item.english}`
      );

      console.log(
        `Key     : ${item.key}`
      );

      console.log('');

      let translation = '';

      while (!translation) {
        translation =
          await ask(
            rl,
            'French translation: '
          );

        if (!translation) {
          console.log(
            '⚠️ Translation cannot be empty.\n'
          );
        }
      }

      /* --------------------------------------------------------------- */
      /* Sauvegarde immédiate                                             */
      /* --------------------------------------------------------------- */

      fr[item.key] =
        translation;

      writeJson(
        FR_FILE,
        fr
      );

      console.log(
        `✅ Saved: "${item.key}" → "${translation}"`
      );

      console.log(
        `📊 Remaining: ${remaining - 1}\n`
      );
    }
  } finally {
    rl.close();
  }

  console.log(
    '----------------------------------------'
  );

  console.log(
    '🎉 Translation synchronization completed.\n'
  );
}

/* -------------------------------------------------------------------------- */
/* ERROR HANDLING                                                             */
/* -------------------------------------------------------------------------- */

main().catch((error) => {
  console.error(
    '\n❌ Error:',
    error
  );

  process.exit(1);
});

