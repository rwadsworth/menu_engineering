# Restaurant Analytics & Menu Engineering

## 1. Core Objective
Transform static restaurant data (visits/revenue) into
**Operational Intelligence** by connecting customer
behavior, menu performance, and labor efficiency.

## 2. Menu Engineering Strategy
Utilize a **four-quadrant matrix** to categorize items based on **Popularity
(Sales Volume)** and **Profitability (Margin)**.

* **Stars:** High Margin / High Popularity → *Keep/Feature.*
* **Plowhorses:** Low Margin / High Popularity → *Price adjustment/Portion control.*
* **Puzzles:** High Margin / Low Popularity → *Promotion/Better placement.*
* **Dogs:** Low Margin / Low Popularity → *Remove/Rebrand.*

## 3. Classification Methodology
To bypass the burden of manual ingredient costing, use **Intuitive Margin Tags**:

* **High:** (e.g., Pasta, Cocktails)
* **Standard:** (e.g., Chicken, Apps)
* **Low:** (e.g., Steak, Seafood)
* **Loss Leader:** (e.g., $1 Specials)

## 4. Modeling Approach (Hybrid Pipeline)

* **LLM (Generative):** Provides "Cold Start" classification by analyzing item
names and descriptions. Best for instant setup.
* **ML (Predictive):** Analyzes long-term behavioral trends (elasticity, voids,
attachments). Best for mature data insights.
* **Segmented Global Training:** Train models on **Cohorts** (e.g., "Fine Dining"
vs. "Coffee Shops") to ensure relevance without sacrificing specific business intelligence.

## 5. Privacy & Anti-Competition Guardrails
To prevent "Competitive Intelligence Leakage" between thousands of accounts:

| Technique | Implementation |
| :--- | :--- |
| **K-Anonymity** | Only show trends if $n > 20$ distinct entities share the behavior. |
| **Z-Scores** | Show "Percentiles" rather than specific dollar amounts. |
| **Concept vs. Item** | Global trends identify *Categories* (e.g., "Spicy App"); local models apply to *Items* (e.g., "Jalapeño Poppers"). |
| **Geofencing** | Disable specific trend-sharing between direct competitors in a 5-mile radius. |
| **Siloed Adapters** | Use LoRA (Low-Rank Adaptation) to keep individual restaurant logic private and separate from the foundation model. |

## 6. Project Architecture

The application is a **monorepo managed with npm workspaces**:

| Directory | Purpose | Stack |
| :--- | :--- | :--- |
| `data/` | Test data generation scripts and output JSON | Python + Faker |
| `backend/` | REST API serving generated data | Node.js + Express + TypeScript |
| `dashboard/` | Analytics dashboard UI | React + TypeScript (Vite) |

**Data flow:** `data/output/*.json` → Express API endpoints → React dashboard.

**Key commands:**

* `npm install` — install all JS dependencies from root.
* `pip install -r data/requirements.txt` — install Python data deps.
* `npm run generate:data` — run Python Faker script to populate `data/output/`.
* `npm run dev` — start backend and dashboard concurrently.

## 7. Mock Data Theme

All mock and seed data represents **Bella Napoli**, an Italian trattoria & wine
bar. Item names, categories, and descriptions must remain authentically Italian.
Do **not** introduce non-Italian items (e.g., "Ribeye Steak", "Garden Salad").

> Full category vocabulary and Faker seeding rules are in
> `.github/instructions/mock-data.instructions.md` (auto-applied to data files).

## 8. Development Conventions

* **Scaffold-first:** When starting a new module, establish folder structure, config
files, and dependency manifests before writing any application logic.
* **Placeholder files:** Empty source files use a single `# TODO` or `// TODO`
comment to mark intent without implementing logic prematurely.
* **Step-by-step sessions:** Each work session has a defined scope. Do not implement
logic beyond the current session's agreed scope.

## 9. Documentation & Linting

* **Markdown lint override:** Keep `MD022` disabled in `.markdownlint.json` for this
workspace unless the team explicitly decides to re-enable it.
