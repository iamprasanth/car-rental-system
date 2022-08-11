const corsOptions = {
    origin: ["http://localhost:4000", "http://localhost:3000", "http://localhost:3001"],
    optionsSuccessStatus: 200 // For legacy browser support
}

exports.corsOptions = corsOptions;