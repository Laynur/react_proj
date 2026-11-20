import React, { useEffect, useRef } from 'react';

function Modal({ title, icon, onClose, children }) {
    const dialogRef = useRef(null);
    const closeRef = useRef(null);

    useEffect(() => {
        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== 'Tab' || !dialogRef.current) return;
            const focusable = dialogRef.current.querySelectorAll(
                'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = previousOverflow;
            previousFocus?.focus?.();
        };
    }, [onClose]);

    return (
        <div className="modal" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
            <section
                className="modal-container liquid-glass"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                ref={dialogRef}
                tabIndex={-1}
            >
                <header className="modal-header">
                    <div className="modal-heading">
                        {icon && <img src={icon} alt="" />}
                        <h2 id="modal-title">{title}</h2>
                    </div>
                    <button
                        ref={closeRef}
                        className="modal-close"
                        type="button"
                        onClick={onClose}
                        aria-label="Закрыть окно"
                        title="Закрыть (Esc)"
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                </header>
                <div className="modal-content">{children}</div>
            </section>
        </div>
    );
}

export default Modal;
