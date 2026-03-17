# Menu Engineering

Restaurant analytics platform for menu performance and operational intelligence.

## Project Structure

```text
menu_engineering/
├── data/        # Python scripts to generate test data
├── backend/     # Express + TypeScript REST API
└── dashboard/   # React + TypeScript analytics dashboard
```

## Getting Started

### 1. Install JavaScript dependencies

```bash
npm install
```

### 2. Install Python dependencies

```bash
pip install -r data/requirements.txt
```

### 3. Generate test data

```bash
npm run generate:data
```

### 4. Start backend and dashboard

```bash
npm run dev
```

Or run them individually:

```bash
npm run dev:backend    # http://localhost:3001
npm run dev:dashboard  # http://localhost:5173
```

## Scripts

| Command | Description |
| :--- | :--- |
| `npm install` | Install all JS workspace dependencies |
| `npm run generate:data` | Run Python Faker script to populate `data/output/` |
| `npm run dev` | Start backend and dashboard concurrently |
| `npm run dev:backend` | Start backend only |
| `npm run dev:dashboard` | Start dashboard only |
| `npm run build` | Build all workspaces |

## Documentation

- Data documentation index: [docs/data/index.md](docs/data/index.md)

<!-- test: jira-cli + gh PR flow 2026-03-17 -->
