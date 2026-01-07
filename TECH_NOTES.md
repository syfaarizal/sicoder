# SICODER — TECH NOTES

These notes document the **design, UX, and architectural decisions**
behind the SICODER landing page.

This is not a tutorial.
This is a record of *why things are built the way they are*.

---

## 1. Context Routing Problem

SICODER solves a **context collision** problem.

Different audiences expect different signals:
- Recruiters expect clarity and structure
- Builders expect raw execution and technical depth

Combining these into one surface weakens both.

**Decision:**  
Use SICODER as a **context router**, not a content container.

---

## 2. Base Layer Concept

SICODER is designed as a **base identity layer**.

Rules:
- No personal storytelling
- No emotional framing
- No audience persuasion

Responsibility:
> Initialize the system and route to the correct context.

All identities are treated as **modules**, not personas.

---

## 3. Section Architecture

### 3.1 Identity Initialization

**Purpose**
- Establish system-first framing
- Signal that this is not a conventional landing page

**Why terminal-style UI**
- Familiar to technical audiences
- Communicates system state quickly
- High signal, low cognitive load

No call-to-action is placed here by design.

---

### 3.2 Context Selection

Only two options are presented.

This is intentional:
- Forces a clear decision
- Reduces cognitive overhead
- Prevents exploration paralysis

#### SYIFA F.A Context
- Light-dominant visual language
- Structured layout
- Professional tone

Signals:
- Recruiter-friendly
- Team-compatible
- Review-ready

#### KAI SHI Context
- Dark-dominant visual language
- High contrast
- Minimal explanation

Signals:
- Experimental
- Builder-first
- Execution-focused

Hover behaviors are asymmetric to reinforce identity separation.

---

### 3.3 Footer as Metadata

The footer behaves as a **system status panel**.

Functions:
- Displays system state
- Lists active contexts
- Provides documentation entry points

Social links are intentionally excluded.

---

## 4. Color System Rationale

Palette is strictly limited to:

- **Red** — signal, focus, active state
- **Black** — execution, depth, control
- **White** — clarity, structure

Red is never used as decorative background.
It only appears when attention is required.

---

## 5. Interaction & Motion Rules

### Hover
- Used only for interactive elements
- Communicates state change
- Never decorative

### Transition
- Short and predictable
- No layout shifts
- Motion confirms action, not personality

Rule:
> If motion is noticeable, it is excessive.

---

## 6. Content Placement Rules

- No blog on the base layer
- No long-form narrative
- No mixed intent content

Long-form content belongs inside contexts, not SICODER.

---

## 7. Technical Simplicity

Stack decisions:
- HTML5
- CSS3
- Vanilla JavaScript

No frameworks.
No build tools.
No external dependencies.

Reason:
The base layer must remain **portable and durable**.

---

## 8. System Principles

1. Context before content
2. Identity as a module
3. Minimal surface, maximum signal
4. Separation of intent
5. Every element must justify its existence

---

## 9. Trade-offs

Accepted limitations:
- Not optimized for virality
- Not conversion-driven
- Requires explanation for non-technical visitors

These are deliberate trade-offs.

---

## 10. System Status

- Base Layer: Stable
- Context Routing: Active
- Design System: Locked
- Expansion Model: Module-based

---

SICODER prioritizes correctness over popularity.
