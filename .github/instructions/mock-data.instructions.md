---
applyTo: "data/**,backend/src/data/**,dashboard/src/data/**"
---

# Mock Data — Bella Napoli Italian Theme

## Why This File Exists

* Menu names and categories drive backend filters and dashboard dimensions.
* Inconsistent category labels create silent breakage in trend grouping and charts.
* Deterministic seeded data keeps local development and demos reproducible.

All mock and seed data in this application represents **Bella Napoli**, an
Italian trattoria & wine bar. Item names, categories, and descriptions must
remain authentically Italian. Use the following category vocabulary:

| Category | Examples |
| :--- | :--- |
| **Antipasti** | Bruschetta, Caprese, Arancini, Burrata, Carpaccio |
| **Pizza** | Margherita, Diavola, Quattro Formaggi, Marinara |
| **Pasta** | Carbonara, Cacio e Pepe, Lasagna, Pappardelle, Linguine |
| **Risotto** | Funghi Porcini, Frutti di Mare, Nero di Seppia |
| **Secondi** | Bistecca Fiorentina, Osso Buco, Pollo, Vitello, Agnello |
| **Seafood** | Salmone, Branzino, Gamberoni, Tonno, Aragosta |
| **Zuppe** | Minestrone, Ribollita, Zuppa di Pesce |
| **Insalate** | Panzanella, Insalata Verde, Insalata di Mare |
| **Contorni** | Patate al Forno, Polenta, Spinaci, Radicchio |
| **Desserts** | Tiramisu, Cannoli, Panna Cotta, Babà, Semifreddo |
| **Wine** | Chianti, Barolo, Brunello, Prosecco, Amarone |
| **Cocktails** | Aperol Spritz, Negroni, Limoncello Spritz, Espresso Martini |
| **Beverages** | Espresso, Cappuccino, Grappa, Amaro, Limoncello |
| **Kids** | Kids Pasta al Burro, Kids Pizza Margherita, Kids Cotoletta |

> Do **not** introduce non-Italian items (e.g., "Ribeye Steak", "Garden Salad",
> "Veggie Wrap") into mock data. Any new seed data must follow the Italian theme.

## Category Consistency Rules

* Category values must match the vocabulary above exactly (including capitalization).
* Do not introduce near-duplicate labels like `Appetizers` when `Antipasti` already exists.
* If a new category is truly required, update all affected backend and dashboard consumers in the same change.

## Faker Seeding

* Always use a fixed seed value in Faker scripts for reproducible test datasets.
* Example: `fake = Faker(); Faker.seed(42)`
