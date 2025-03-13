const CONTRIBUTOR_TYPES = [
	{ value: 'juridica', label: 'PERSONA JURÍDICA' },
	{ value: 'natural', label: 'PERSONA NATURAL' },
  ];
  
  export const ContributorTypeSelector = ({ selectedType, onTypeChange }) => {
	return (
	  <div className='space-y-3 mb-5'>
		{CONTRIBUTOR_TYPES.map((type) => (
		  <label
			key={type.value}
			className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer w-full ${
			  type.value === selectedType ? 'bg-gray-100 shadow-md' : 'bg-white'
			}`}>
			<input
			  type='radio'
			  name='contributorType'
			  value={type.value}
			  checked={type.value === selectedType}
			  onChange={() => onTypeChange(type.value)}
			  className='form-radio'
			/>
			<span className='ml-2 font-medium'>{type.label}</span>
		  </label>
		))}
	  </div>
	);
  };
  