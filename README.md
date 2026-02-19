# YieldSync Stakeholder Map

An interactive stakeholder map for YieldSync's Geo AI Processing platform, built with Astro and React Flow.

```sh
npm create astro@latest -- --template minimal
npm install @xyflow/react 
```


## 🚀 Project Structure

Inside of your Astro/mindmap project, you'll see the following folders and files:

```stakeholder-map/
├── src/
│   ├── components/
│   │   └── StakeholderMap.jsx    # Main React Flow component with YieldSync data
│   └── pages/
│       └── index.astro            # Main page
├── astro.config.mjs               # Astro + React configuration
├── package.json                   # Dependencies
└── README.md                      # This file
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

### Changing Colors

Edit `src/components/StakeholderMap.jsx` and find the node's style:

```javascript
style: { 
  background: '#10b981',  // Change this color code
  color: 'white', 
  // ...
}
```

Current color scheme:
- **Green (#10b981)**: Agribusinesses & Cooperatives
- **Blue (#3b82f6)**: Agri-finance & Insurance
- **Orange (#f59e0b)**: Food & Commodity Corporates
- **Purple (#8b5cf6)**: Government Programs
- **Dark Gray (#1e293b)**: Core Platform
- **Gray (#475569)**: Data Sources

## 🧑🏽‍💻Technologies

- **Astro** - Static site framework
- **React** - UI components (via Astro islands)
- **React Flow** - Interactive node-based diagrams

## Future Enhancements to Consider

- Add export to PNG/PDF functionality
- Add localStorage auto-save
- Create different node types (Problem, Solution, Value, etc.)
- Add filtering by stakeholder type
- Add presentation mode (hide controls)
- Add collaborative editing

## 📚 Resources

- [React Flow Docs](https://reactflow.dev/)
- [Astro Docs](https://docs.astro.build/)
- [React Flow Edge Types](https://reactflow.dev/api-reference/types/edge)
