import { useCart } from '@/context/CartContext'
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useEffect } from 'react'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[150] bg-charcoal/55 transition-opacity duration-300"
          onClick={closeCart}
        />
      )}
      {/* Drawer */}
      <div
        className={
          'fixed top-0 right-0 z-[200] h-full w-full max-w-[420px] bg-warm-white transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ' +
          (isOpen ? 'translate-x-0' : 'translate-x-full')
        }
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-charcoal/[0.08]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-charcoal" strokeWidth={1.5} />
              <span className="font-sans text-[14px] font-500 tracking-[0.04em] text-charcoal">
                Your Cart
              </span>
              {totalItems > 0 && (
                <span className="text-[11px] font-sans font-500 text-ash ml-1">
                  ({totalItems})
                </span>
              )}
            </div>
            <button
              onClick={closeCart}
              className="p-1 text-ash hover:text-charcoal transition-colors duration-200"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-10 h-10 text-fog mb-4" strokeWidth={1.5} />
                <p className="font-sans text-[14px] text-ash">Your cart is empty</p>
                <p className="font-sans text-[12px] text-fog mt-1">Add a shelter to begin</p>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-[100px] bg-limestone rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className="font-sans text-[13px] font-500 text-charcoal truncate">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-0.5 text-fog hover:text-charcoal transition-colors ml-2 flex-shrink-0"
                        >
                          <X className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                      <p className="font-sans text-[13px] text-ash mt-0.5">
                        CHF {item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center border border-charcoal/20 rounded hover:border-charcoal/40 transition-colors"
                        >
                          <Minus className="w-3 h-3" strokeWidth={1.5} />
                        </button>
                        <span className="font-sans text-[13px] font-500 text-charcoal w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border border-charcoal/20 rounded hover:border-charcoal/40 transition-colors"
                        >
                          <Plus className="w-3 h-3" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="px-6 py-5 border-t border-charcoal/[0.08]">
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-[13px] text-ash">Subtotal</span>
                <span className="font-sans text-[16px] font-500 text-charcoal tracking-[0.02em]">
                  CHF {totalPrice.toLocaleString()}
                </span>
              </div>
              <button className="w-full py-3 bg-charcoal text-warm-white font-sans text-[13px] font-500 tracking-[0.04em] hover:bg-charcoal/90 transition-colors duration-200">
                Proceed to Checkout
              </button>
              <p className="text-center font-sans text-[11px] text-ash mt-3">
                Shipping calculated at checkout
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
