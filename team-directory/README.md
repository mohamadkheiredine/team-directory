# Team Directory (Next.js + PHP API)

## Overview
This app manages employees and products:
- Employees are stored in a local JSON file (`/data/employees.json`).
- Products are managed through a PHP API (integrated into the Next.js app).

## Requirements
- Node.js 18+
- XAMPP (Apache + MySQL)

## Setup

### 1. PHP API
- Copy the `team-api` folder (attached separately as a zip) into your XAMPP `htdocs` directory.
- Start **Apache** and **MySQL** in the XAMPP Control Panel.
- Import the provided SQL schema/seed from the PHP project README.
- Visit:  
    http://localhost/team-api/index.php/api/products

### 2. Next.js App
- Clone this repo:
```bash
  git clone [repo-link]
  cd team-directory/team-directory
  npm install
  npm run dev

- Notes
  Employees → handled with local JSON.

  Products → handled via PHP API (CRUD).

  Search, validation, and error handling included.
