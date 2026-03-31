class PromoBanner extends HTMLElement {
  connectedCallback() {
    if (sessionStorage.getItem('promo-banner-dismissed') === 'true') {
      this.style.display = 'none';
      return;
    }

    const shadow = this.attachShadow({ mode: 'open' });

    const PRODUCT_NAME = 'Coffee Mug';
    const PRODUCT_IMAGE = 'https://recharge-noons-coffee.myshopify.com/cdn/shop/files/Premiummatcha_2.png?v=1769192650&width=1920';
    const PRODUCT_URL = 'https://recharge-noons-coffee.myshopify.com/products/coffee-mug?variant=46334392598717';
    const ORIGINAL_PRICE = 35.00;
    const DISCOUNT_PERCENT = 25;
    const DISCOUNTED_PRICE = (ORIGINAL_PRICE * (1 - DISCOUNT_PERCENT / 100)).toFixed(2);

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .banner {
          position: relative;
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 20px 24px;
          border-radius: 12px;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          color: #fff;
          overflow: hidden;
        }

        .banner::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(255, 193, 68, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: #fff;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          line-height: 1;
          transition: background 0.2s;
          z-index: 2;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .image-wrapper {
          flex-shrink: 0;
          width: 100px;
          height: 100px;
          border-radius: 10px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.1);
        }

        .image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .content {
          flex: 1;
          min-width: 0;
          padding-right: 24px;
        }

        .badge {
          display: inline-block;
          background: #ffc144;
          color: #1a1a2e;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 3px 10px;
          border-radius: 4px;
          margin-bottom: 8px;
        }

        .product-name {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 4px 0;
          line-height: 1.3;
        }

        .subtitle {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 12px 0;
        }

        .pricing {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .original-price {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.45);
          text-decoration: line-through;
        }

        .sale-price {
          font-size: 20px;
          font-weight: 700;
          color: #ffc144;
        }

        .discount-tag {
          font-size: 11px;
          font-weight: 700;
          background: rgba(255, 193, 68, 0.2);
          color: #ffc144;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .cta-btn {
          display: inline-block;
          background: #ffc144;
          color: #1a1a2e;
          font-size: 14px;
          font-weight: 700;
          padding: 10px 24px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
        }

        .cta-btn:hover {
          background: #ffd376;
          transform: translateY(-1px);
        }

        .cta-btn:active {
          transform: translateY(0);
        }

        @media (max-width: 520px) {
          .banner {
            flex-direction: column;
            text-align: center;
            padding: 20px 16px;
            gap: 16px;
          }

          .content {
            padding-right: 0;
          }

          .pricing {
            justify-content: center;
          }

          .image-wrapper {
            width: 80px;
            height: 80px;
          }
        }
      </style>

      <div class="banner">
        <button class="close-btn" aria-label="Dismiss">&times;</button>

        <div class="image-wrapper">
          <img src="${PRODUCT_IMAGE}" alt="${PRODUCT_NAME}" />
        </div>

        <div class="content">
          <span class="badge">New Launch</span>
          <p class="product-name">${PRODUCT_NAME}</p>
          <p class="subtitle">Add it to your next order and get an exclusive launch discount!</p>

          <div class="pricing">
            <span class="original-price">$${ORIGINAL_PRICE.toFixed(2)}</span>
            <span class="sale-price">$${DISCOUNTED_PRICE}</span>
            <span class="discount-tag">${DISCOUNT_PERCENT}% OFF</span>
          </div>

          <a class="cta-btn" href="${PRODUCT_URL}" target="_top">
            Add to My Order
          </a>
        </div>
      </div>
    `;

    shadow.querySelector('.close-btn').addEventListener('click', () => {
      sessionStorage.setItem('promo-banner-dismissed', 'true');
      this.style.display = 'none';
    });
  }
}

export default PromoBanner;
