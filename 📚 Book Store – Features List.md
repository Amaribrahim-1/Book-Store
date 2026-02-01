📚 Book Store – Features List

1️⃣ Core Features (الأساس)

1. عرض كل الكتب (Books List)
2. Categorie للكتب
3. Sorting (السعر / الاسم)
4. صفحة تفاصيل الكتاب (Book Details)
5. Add to Cart
6. Remove from Cart
7. تعديل الكمية
8. حساب Total Price
9. Persist Cart (localStorage)

2️⃣ User Experience

Search بالاسم

Filter بالـ Category

Combine Search + Filter

Loading State

Error State

Empty States (no books / empty cart)

Responsive Design

3️⃣ Wishlist

Add to Wishlist

Remove from Wishlist

Wishlist Page

Persist Wishlist

4️⃣ Routing

React Router

Dynamic Routes (/books/:id)

Nested Routes

Protected Routes (later)

404 Page

5️⃣ State Management

Local State (component-level)

Global State (Cart / Wishlist)

useReducer للـ Cart logic

Context API (Cart / Wishlist / Auth)

Derived State (totals, counts)

6️⃣ Authorization \& Auth (مرحلة بعدين)

Login Page

Logout

currentUser state

User Role (user / admin)

Protected User Routes

Protected Admin Routes

Redirect based on role

7️⃣ Admin Panel

Admin Dashboard

Add Book

Edit Book

Delete Book

Admin-only Routes

8️⃣ Performance Optimization

React.memo للكارد

useCallback للـ handlers

useMemo للـ filtering \& sorting

Avoid unnecessary re-renders

9️⃣ Clean Code \& Architecture

Feature-based folder structure

Reusable UI components

Custom Hooks (fetch, cart logic)

Separation of concerns

Constants \& config files

🔟 Extra (اختياري بس تقيل)

Dark / Light Mode

Ratings \& Reviews

Orders History

Fake Checkout Flow

Skeleton Loading

Toast Notifications

فيتشر متقدمة: اعمل Star component وخلي اليوزر يقدر يقيم الكتب واحفظ في اللوكال ستوريج

وجرب تستخدم useLocalStorage أو اعملها لوحدك

توست نجاح في ال Book لما يضيف في الكارت

توست نجاح لما يضيف في الويش ليست

توست نجاح في المسح من الكارت بعد المودال

توست نجاح في المسح من الوش ليست بعد الموال

تحذير لما يحاول يخلي ال كوانتيتي اقل من الواحد

توست ايرور في فيتش الكتب

توست ايرور في فيتش كتاب

توست نجاح ف اللوجين

توست ايرور في اللوجين
