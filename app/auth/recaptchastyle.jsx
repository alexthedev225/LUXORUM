  <style jsx global>{`
          /* Personnalisation du badge reCAPTCHA */
          .grecaptcha-badge {
            z-index: 9999 !important;
            transform: scale(0.9) !important;
            transform-origin: bottom right !important;
            opacity: 0.95 !important;
            transition: all 0.3s ease !important;
          }
          
          .grecaptcha-badge:hover {
            transform: scale(1) !important;
            opacity: 1 !important;
          }
          
          /* Amélioration de la lisibilité du badge sur fond sombre */
          .grecaptcha-badge .rc-anchor-light {
            background: rgba(255, 255, 255, 0.98) !important;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(251, 191, 36, 0.2) !important;
            border-radius: 6px !important;
          }
        `}</style>