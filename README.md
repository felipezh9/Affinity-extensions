# Affinity Custom Extensions

Custom Web Component extensions for the [Recharge Affinity Home Page Builder](https://docs.getrecharge.com/docs/using-custom-extensions-in-the-affinity-page-builder).

## Extensions

### Loyalty Widget (`loyalty-widget/`)

An Okendo-style loyalty program widget for Joy Organics. Displays points balance, tier progression, earn actions, and redeemable rewards.

| Field | Value |
|---|---|
| **Tag name** | `joy-loyalty-widget` |
| **File URL** | `https://cdn.jsdelivr.net/gh/felipezh9/Affinity-extensions@main/loyalty-widget/loyalty-widget.js` |

### Promo Banner (`promo-banner/`)

A promotional banner that lets customers add a discounted product to their next order via the Recharge SDK.

| Field | Value |
|---|---|
| **Tag name** | `promo-banner` |
| **File URL** | `https://cdn.jsdelivr.net/gh/felipezh9/Affinity-extensions@main/promo-banner/promo-banner.js` |

## Local Development

Each extension includes a `serve.js` for local testing:

```bash
# Loyalty widget (port 8788)
node loyalty-widget/serve.js
# Preview at http://127.0.0.1:8788/preview

# Promo banner (port 8787)
node promo-banner/serve.js
```

## Registering in Affinity Page Builder

1. In the merchant portal, go to **Storefront** > **Customer portal**
2. Open the **Home page** builder and click **Add a section**
3. Select the **Custom extensions** tab > **Create a custom extension**
4. Enter the **File URL**, **Tag name**, and a display name
5. Save, position the section, and enable visibility
