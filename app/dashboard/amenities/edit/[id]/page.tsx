import AmenityForm from "@/components/form/AmenityForm";
import Heading from "@/components/common/Heading";
import { getAmenityById } from "@/lib/actions/amenityActions";

const CreateAmenityDashboard = async ({
    params,
}: {
    params: { id: string };
}) => {
    const amenity = await getAmenityById(params.id);

    return (
        <div>
            <Heading underline={false} className="mx-0">
                New Amenity
            </Heading>
            <AmenityForm amenity={amenity} />
        </div>
    );
};

export default CreateAmenityDashboard;
