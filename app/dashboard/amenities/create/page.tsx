import AmenityForm from "@/components/form/AmenityForm";
import Heading from "@/components/common/Heading";

const CreateAmenityDashboard = () => {
    return (
        <div>
            <Heading underline={false} className="mx-0">
                New Amenity
            </Heading>
            <AmenityForm />
        </div>
    );
};

export default CreateAmenityDashboard;
