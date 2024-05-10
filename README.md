# Accountant

**_Accountant_** is a Next.js app for your expenses, incomes, loans (and more!)

Available both [via browser](https://wyd-hedge.vercel.app) and directly [inside Telegram](https://t.me/wydhedge_bot/accounting).

## TODO

These are plans for further development in foreseable future.

Feature-wise:

- [ ] Add different metrics and statistics for user operations.
- [ ] Add family access. Multiple users can share total balance and operation history (adult mode), a _supervisor_ can view other users' stats (child mode).
- [ ] Add Apple Shortcuts for quicker access (good idea by Gleb Kletskov).
- [ ] Add integration with QR codes (for TMA). Scan invoices to automatically update your operations.
- [ ] Add stock and other investments tracking. Possibly, add option to view your total balance with or without investments included.
- [ ] Add loans support. Share same loan via 'invitation' link. Generate different link for TMA users.
- [ ] Add hotkeys and command menu to web version.

Codebase-wise:

- [x] Move from FSD to Next-specific file structure.
- [x] Add i18n (`next-intl`).
- [x] Rename all internal backend to camelCase.
- [ ] Add loading states to improve UX.
- [x] Add low-res favicon.
- [x] Add better components for TMA, decide the code structure to separate those from shadcn.

Global:

- [ ] Create a functional Telegram Bot to serve features with CLI-alike experience.
