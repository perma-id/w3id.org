export default {
  id: 'tree/no-case-collision',
  description:
    'No two paths may differ only in the case of their letters',
  tags: ['tree', 'structure'],
  severity: 'error',
  // macOS and Windows checkouts have case-insensitive filesystems. Two paths
  // that differ only in case collapse into one there, so the working tree
  // cannot be checked out correctly and the served content is unpredictable.
  critical: true,
  scope: 'tree',
  messages: {
    collision:
      '{{path}} differs from {{other}} only in letter case. On macOS and ' +
      'Windows these are the same path, so the repository cannot be checked ' +
      'out correctly. Pick a name that differs by more than case.'
  },
  check(ctx, report) {
    // Group every path -- files and the directories implied by them -- by its
    // lower-cased spelling.
    const byLower = new Map();
    const seen = new Set();

    const record = p => {
      if(seen.has(p)) {
        return;
      }
      seen.add(p);
      const lower = p.toLowerCase();
      if(!byLower.has(lower)) {
        byLower.set(lower, []);
      }
      byLower.get(lower).push(p);
    };

    for(const p of ctx.tree) {
      const segments = p.split('/');
      for(let i = 1; i <= segments.length; ++i) {
        record(segments.slice(0, i).join('/'));
      }
    }

    const colliding = new Set();
    for(const [lower, paths] of byLower) {
      if(paths.length > 1) {
        colliding.add(lower);
      }
    }

    // Everything inside a colliding directory collides too. Reporting each
    // one would bury the finding that matters -- the directory -- under one
    // line per file beneath it.
    const inheritsCollision = p => {
      for(let at = p.lastIndexOf('/'); at !== -1;
        at = p.lastIndexOf('/', at - 1)) {
        if(colliding.has(p.slice(0, at).toLowerCase())) {
          return true;
        }
      }
      return false;
    };

    for(const lower of colliding) {
      const sorted = [...byLower.get(lower)].sort();
      if(inheritsCollision(sorted[0])) {
        continue;
      }
      // Report against each colliding path, so whichever one a change touches
      // is the one that gets flagged.
      for(const p of sorted) {
        report({
          file: p,
          messageId: 'collision',
          data: {path: p, other: sorted.filter(o => o !== p).join(', ')}
        });
      }
    }
  }
};
