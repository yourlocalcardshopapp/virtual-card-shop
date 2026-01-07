import app from '../server';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API available at http://localhost:${PORT}/api`);
});
