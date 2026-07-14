# AI Workflow Comparison

## Overview

This exercise compared two different AI-assisted development workflows while implementing the same React settings form. The objective was not only to build the feature, but also to evaluate how prompt quality affects code quality, development speed, and review effort.

## Round One – Vague Prompt

In the first round, I used a very simple prompt asking the AI to create a React settings form with validation. The generated code was functional but lacked structure and consistency. Validation was implemented manually, accessibility was limited, and the component mixed UI logic with validation logic. The AI also made incorrect assumptions about the project setup, which resulted in missing imports and components that required manual fixes. The review process took longer because several issues had to be identified and corrected after the code was generated.

## Round Two – Structured Prompt

For the second round, I started a fresh AI session and used a detailed prompt with clear requirements, constraints, file references, and verification instructions. I specified React, TypeScript, React Hook Form, Zod validation, accessibility requirements, reusable components, and testing with Vitest. The generated code was significantly more organized, easier to understand, and closer to production quality. Validation logic was cleaner, component separation was improved, and accessibility features such as proper labels were included by default.

Although writing the prompt required more time initially, the total development process was faster because the generated solution needed fewer corrections. The AI also followed the requested architecture more accurately.

## AI Mistake I Caught

One important mistake produced by the AI was replacing React's `StrictMode` with a non-existent `FragmentDirective` component in `main.tsx`, which caused compilation errors. I identified the problem, restored the correct React structure, and verified that the application compiled successfully. I also fixed missing imports and ensured that the project dependencies were correctly installed before running the application.

## Lessons Learned

This exercise demonstrated that detailed prompts produce higher-quality results and reduce review effort. Providing explicit constraints, project conventions, verification steps, and expected behavior allows the AI to generate code that is more reliable and easier to maintain. Going forward, I will always begin with a clear specification, ask the AI to verify its work, and review every generated change before accepting it.