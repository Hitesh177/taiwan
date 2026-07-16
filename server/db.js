import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import bcrypt from 'bcryptjs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, '..', 'data', 'cms.db')

let db

export function getDb() {
  if (!db) {
    const dir = path.dirname(DB_PATH)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    db = new Database(DB_PATH)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
    initSchema()
    seedDefaults()
  }
  return db
}

function initSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL DEFAULT 'Author',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT DEFAULT '',
      post_count INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT DEFAULT '',
      excerpt TEXT DEFAULT '',
      featured_image TEXT DEFAULT '',
      meta_title TEXT DEFAULT '',
      meta_description TEXT DEFAULT '',
      status TEXT DEFAULT 'draft' CHECK(status IN ('draft','published','archived','scheduled')),
      category_id INTEGER,
      author_id INTEGER DEFAULT 1,
      reading_time INTEGER DEFAULT 1,
      published_at DATETIME,
      scheduled_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id),
      FOREIGN KEY (author_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS post_tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      tag TEXT NOT NULL,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size INTEGER NOT NULL,
      alt_text TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS post_revisions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT DEFAULT '',
      excerpt TEXT DEFAULT '',
      saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    );
  `)
}

function seedDefaults() {
  const userCount = db.prepare('SELECT COUNT(*) as c FROM users').get().c
  if (userCount === 0) {
    const hash = bcrypt.hashSync('admin123', 10)
    db.prepare('INSERT INTO users (email, password, name) VALUES (?, ?, ?)').run('admin@taiwanexperience.com', hash, 'Admin')
  }

  const catCount = db.prepare('SELECT COUNT(*) as c FROM categories').get().c
  if (catCount === 0) {
    const cats = [
      ['Taipei', 'taipei'], ['New Taipei', 'new-taipei'], ['Taichung', 'taichung'],
      ['Tainan', 'tainan'], ['Kaohsiung', 'kaohsiung'], ['Hualien', 'hualien'],
      ['Taitung', 'taitung'], ['Taoyuan', 'taoyuan'], ['Yilan', 'yilan'],
      ['Hsinchu', 'hsinchu'], ['Chiayi', 'chiayi'], ['Nantou', 'nantou'],
      ['Pingtung', 'pingtung'], ['Miaoli', 'miaoli'], ['Changhua', 'changhua'],
      ['Yunlin', 'yunlin'], ['Penghu', 'penghu'], ['Kinmen', 'kinmen'],
      ['Matsu', 'matsu'], ['Keelung', 'keelung'],
      ['Food', 'food'], ['Cafés', 'cafes'], ['Culture', 'culture'],
      ['Travel Tips', 'travel-tips'], ['Road Trips', 'road-trips'],
      ['Night Markets', 'night-markets'], ['Hiking', 'hiking']
    ]
    const stmt = db.prepare('INSERT INTO categories (name, slug) VALUES (?, ?)')
    for (const [name, slug] of cats) stmt.run(name, slug)
  }
}