# Project TODO List

## Admin Dashboard & CMS Features
- [ ] **Admin Authentication**
    - [ ] Create an Admin Login page.
    - [ ] Implement Auth Context to protect admin routes.
    - [ ] Secure Appwrite client/server logic for admin actions.

- [ ] **Admin Dashboard**
    - [ ] Create `/admin` page (protected).
    - [ ] Add ability to manage (approve/delete) Testimonials.
    - [ ] Add ability to manage Projects (CRUD).
    - [ ] Add ability to view Messages.

## Public Features
- [ ] **Testimonials Form**
    - [ ] Create a public page `/review` (or similar).
    - [ ] Design a user-friendly form for submitting reviews (Name, Role, Company, Review, Rating).
    - [ ] Integrate with Appwrite to save the review.
    - [ ] Add success state / redirection back to the main portfolio.

- [ ] **Testimonials Section Integration**
    - [ ] Ensure the 'What people say?' section on the home page fetches approved reviews from Appwrite.
