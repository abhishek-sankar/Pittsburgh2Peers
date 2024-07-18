import { Radio } from "antd"
import { motion } from "framer-motion"

const LookingFor = ({onLookingForChange}) => {
	return (
		<motion.div
		className="flex flex-col items-center p-4"
		key="looking-for-container"
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		transition={{ duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
	  >
		<div className='flex flex-col items-center gap-4 p-4'>
			<div>And you're looking for ...</div>
			<Radio.Group defaultValue="a" buttonStyle="solid" onChange={onLookingForChange}>
				<Radio.Button value="ride">Ride</Radio.Button>
				<Radio.Button value="passenger">Passengers</Radio.Button>
			</Radio.Group>
		</div>
	</motion.div>
	)
}

export default LookingFor