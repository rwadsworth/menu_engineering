# Task Summary: SOMM-5951

## Title
[getbentobox] [FE/BE] - Remove mfa_setup_is_mandatory feature flag pt. 2

## Issue URL
https://getbentobox.atlassian.net/browse/SOMM-5951

## Type
Task

## Assignee
Robert Wadsworth

## Overview
Once MFA is mandatory for all users, the feature flag can be removed and the code updated. This ticket continues a previous PR after it failed QA.

## Acceptance Criteria

1. **Remove references to the feature flag** and maintain the correct logic
2. **Deprecate:** `BentoUser.is_multi_factor_enabled` field
3. **Remove:** `BentoUser.enable_mfa` method
4. **Ensure** the field is removed from site_admin
5. **Update** tests as required

## Repository
- bentobox/sushi

## Context
This is a continuation task that follows up on a previous implementation attempt that did not pass QA. The work focuses on cleaning up the codebase after MFA is made mandatory, ensuring all feature flag references are properly removed while maintaining correct business logic.

## Next Steps
1. Review previous PR and QA feedback
2. Remove `mfa_setup_is_mandatory` feature flag references
3. Update `BentoUser` model to deprecate `is_multi_factor_enabled`
4. Remove `BentoUser.enable_mfa` method
5. Update site_admin configuration
6. Update related tests
7. Submission for QA review

---
**Created:** 2026-03-20  
**Test Purpose:** Jira/GitHub Copilot integration validation
