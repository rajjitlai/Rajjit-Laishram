# Project TODO List

## 🎨 Design Improvements

### High Priority (Roadmap to 10/10)
- [x] **Experience Timeline Enhancements**
    - [x] Add cyan/green glow effect to timeline line
    - [x] Add pulsing indicator dot for "Present" position
    - [x] Enhance year markers with neon glow

- [x] **Button Consistency & CTAs**
    - [x] Redesign "Contact Me" link to match "Download Resume" button style
    - [x] Ensure consistent hover effects across all primary buttons
    - [x] Add proper visual hierarchy for CTAs

- [x] **Skills Section Interactivity**
    - [x] Add hover effects (scale-up/glow) to skill cards
    - [x] Consider adding subtle animations on scroll

- [ ] **Testimonials Empty State**
    - [ ] Add "Submit Your Review" CTA button to empty state
    - [ ] Add placeholder illustration or icon
    - [ ] Improve empty state messaging

- [ ] **Project Visual Polish** (Moved to High)
    - [ ] Wrap project thumbnails in device mockups (MacBook/iPhone frames)
    - [ ] Add "Live Demo" button alongside "View" button with distinct style
    - [ ] Ensure consistent image aspect ratios

### 💎 Visual Polish (10/10 Features)
- [ ] **Micro-Interactions**
    - [ ] Add magnetic effect to primary buttons (buttons pull towards cursor)
    - [ ] Implement creative link hover animations (e.g., underlining reveals)
    - [ ] Add "Copy Email" button with toast notification in Contact section

- [ ] **Loading Experience**
    - [ ] Implement Skeleton loaders for Testimonials & Projects (instead of text popping in)
    - [ ] Add smooth page transition animations

### 🔧 Technical Excellence (10/10 Features)
- [ ] **SEO & Social Sharing**
    - [ ] Add OpenGraph (OG) images for social sharing (a banner with your face/title)
    - [ ] Polish meta descriptions and title tags for all pages
    - [ ] Add JSON-LD structured data for Portfolio/Person

- [ ] **Performance Audit**
    - [ ] Achieve 100/100 Lighthouse score (Performance, Accessibility, SEO)
    - [ ] Optimize all images (WebP format, proper sizing)

### Medium Priority
- [ ] **Micro-interactions & Animations**
    - [ ] Add subtle floating animation to profile image
    - [ ] Implement parallax scrolling effects
    - [ ] Add smooth transitions between sections
    - [ ] Consider scroll-triggered animations

- [ ] **Additional Features**
    - [ ] Add dark/light mode toggle (currently only dark)
    - [ ] Implement loading skeleton screens
    - [ ] Add "Back to Top" floating button

## 🔧 Technical Improvements
- [ ] **Appwrite Schema Updates**
    - [x] Add `approved` field (Boolean, default: false) to Testimonials collection
    - [x] Add `rating` field (Integer, min: 0, max: 5) to Testimonials collection
    - [ ] Uncomment approval filter in `lib/getTestimonials.ts` after schema update

- [ ] **Performance Optimization**
    - [ ] Add pagination for admin management lists
    - [ ] Implement image optimization for project thumbnails
    - [ ] Consider lazy loading for sections

- [ ] **Email integration for contact form**
    - [ ] Add email integration for contact form
    - [ ] Add email integration for review form

- [ ] **Support other data to be fetched from appwrite**

## ✅ Completed Features

### Admin Dashboard & CMS
- ✅ Admin authentication with role-based access
- ✅ Protected admin routes (now at `/setup`)
- ✅ Messages management (view/delete)
- ✅ Testimonials management (approve/delete)
- ✅ Projects CRUD (create/edit/delete)

### Public Features
- ✅ Review submission form with star ratings
- ✅ File upload for profile images
- ✅ Testimonials display on homepage
- ✅ Contact form integration

### Recent Updates
- ✅ Changed admin routing from `/admin` to `/setup`
- ✅ Added star rating component to review form
- ✅ Added "Upload a profile" label to file upload
- ✅ Fixed Appwrite v17 localStorage SSR issues (downgraded to v16)

---

**Priority Order for Implementation:**
1. Experience Timeline Glow (Quick visual impact)
2. Button Consistency (Improves UX/conversion)
3. Project Device Mockups (Professional polish)
4. Skills Section Tabs (Better organization)
5. Micro-interactions (Enhanced engagement)
