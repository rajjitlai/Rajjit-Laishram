# Project TODO List

## 🎨 Design Improvements

### High Priority (Quick Wins)
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

### Medium Priority
- [ ] **Project Cards Enhancement**
    - [ ] Wrap project thumbnails in device mockups (laptop/phone frames)
    - [ ] Add "Live Demo" button alongside "View" button
    - [ ] Ensure consistent image aspect ratios

- [ ] **Skills Section Reorganization**
    - [ ] Implement tabbed interface (Frontend/Backend/IoT/Tools)
    - [ ] Or consider accordion/collapsible sections
    - [ ] Reduce vertical space while maintaining clarity

- [ ] **Contact Section Polish**
    - [ ] Add hover effects to "Send" button matching green theme
    - [ ] Consider adding social media icons near form
    - [ ] Add form validation feedback

### Lower Priority (Nice to Have)
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
