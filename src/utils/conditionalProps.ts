const conditionalProps = <Obj extends Record<string, any>>(
	condition: boolean,
	props: Partial<Obj>,
): Partial<Obj> => (condition ? props : {});

export default conditionalProps;
