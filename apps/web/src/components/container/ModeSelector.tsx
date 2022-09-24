function ModeSelector(props: { selected: 'flow-view' | 'editor' }) {
  const selectedClasses =
    'h-10 bg-primary-bg w-24 rounded-md text-sm font-light border-2 border-solid border-primary';
  const unselectedClasses = 'h-10 bg-primary    w-24 rounded-md text-sm font-light text-white';

  return (
    <div className="h-10 bg-primary rounded-md text-sm font-light">
      <button className={props.selected === 'flow-view' ? selectedClasses : unselectedClasses}>
        Flow view
      </button>
      <button className={props.selected === 'editor' ? selectedClasses : unselectedClasses}>
        Editor
      </button>
    </div>
  );
}

export default ModeSelector;
