## [ERR-20260902-001] powershell-array-path

**Logged**: 2026-09-02T15:40:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tooling

### Summary
PowerShell array construction without parentheses concatenated two Join-Path expressions into one invalid path.

### Details
Used `@(Join-Path $root 'a', Join-Path $root 'b')`, which PowerShell parsed as arguments to the first command. The replacement command failed before modifying source files.

### Suggested Action
Wrap each Join-Path expression in parentheses or assign paths separately.

### Metadata
- Source: error
- Related Files: components/site-shell.tsx, components/admin-shell.tsx

## [ERR-20260902-002] agent-browser-ref-powershell

**Logged**: 2026-09-02T15:52:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tooling

### Summary
PowerShell invocation of `agent-browser click @e7` dropped the ref argument.

### Details
The CLI returned `Missing arguments for: click`. Quoting the ref (`"@e7"`) is required in this shell.

### Suggested Action
Quote agent-browser refs in PowerShell commands.

## [ERR-20260902-003] codegraph-index-unavailable

**Logged**: 2026-09-02T16:05:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tooling

### Summary
CodeGraph command could not find an index for the current project.

### Details
The workspace root contains `.codegraph`, but it is not a project index for `D:\AI\image transit codex`; CodeGraph reported no index. Continued with direct file inspection.

### Suggested Action
Use CodeGraph only when the project root itself has a valid `.codegraph` index.

## [ERR-20260902-004] regex-replacement-escape

**Logged**: 2026-09-02T16:08:00+08:00
**Priority**: low
**Status**: resolved
**Area**: frontend

### Summary
PowerShell regex replacement inserted a literal backslash into the CSS selector.

### Details
Replacement string used `\.platform-grid` and produced `\.platform-grid`, invalid CSS. Corrected to `.platform-grid`.

### Suggested Action
Inspect replacement output immediately after regex-based CSS cleanup.

## [ERR-20260902-005] powershell-literal-newline

**Logged**: 2026-09-02T16:20:00+08:00
**Priority**: low
**Status**: resolved
**Area**: frontend

### Summary
PowerShell single-quoted replacement inserted literal `\n` into CSS.

### Details
The `.icon-btn` replacement used a single-quoted string containing `\n`, which wrote the backslash characters instead of a line break. Corrected the CSS output.

### Suggested Action
Use a here-string or explicit `` `r`n `` for PowerShell replacement newlines.

## [ERR-20260902-006] exact-block-mismatch

**Logged**: 2026-09-02T16:34:00+08:00
**Priority**: low
**Status**: resolved
**Area**: frontend

### Summary
Exact text replacement did not match the existing sort block.

### Details
The source formatting differed from the manually reconstructed block. Replaced the scoped comparator by regex after inspecting the actual file.

### Suggested Action
Inspect the current source before exact replacement; use a scoped regex only when formatting may drift.

## [ERR-20260902-007] powershell-here-string-header

**Logged**: 2026-09-02T16:35:00+08:00
**Priority**: low
**Status**: resolved
**Area**: tooling

### Summary
PowerShell here-string header must be followed by a newline.

### Details
A here-string was started inline with its first content token, causing a parser error. Retried with the header on its own line.

### Suggested Action
Always place `@'` or `@"` at the end of a line before here-string content.
