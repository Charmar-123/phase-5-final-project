import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ListItem = ({ text }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}
  >
    {text}
  </motion.div>
);

const GridView = ({ items }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}
  >
    {items.map((item, index) => (
      <ListItem key={index} text={item} />
    ))}
  </motion.div>
);

const ListView = ({ items }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {items.map((item, index) => (
      <ListItem key={index} text={item} />
    ))}
  </motion.div>
);

const TestGrid = () => {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  const [gridView, setGridView] = useState(false);

  return (
    <div>
      <button onClick={() => setGridView(!gridView)}>
        Toggle View
      </button>

      <AnimatePresence mode='wait'>
        {gridView ? <GridView items={items} /> : <ListView items={items} />}
      </AnimatePresence>
    </div>
  );
};

export default TestGrid;