const preview = (template) => {
    if (template === "cv1") return "/template06";
    if (template === "cv2") return "/template05";
    if (template === "cv3") return "/template01";
    if (template === "cv4") return "/template03";
    if (template === "cv5") return "/template02";
    if (template === "cv6") return "/template07";
    if (template === "cv7") return "/template04";
    if (template === "cv8") return "/template09";
    if (template === "cv9") return "/template11";
    if (template === "cv10") return "/template08";
    if (template === "cv11") return "/template10";
};
export function getNext(component, template) {
    if (template === 'cv4' && component === 'certificates')
        return '/buildcv/technicalskills';
    else if (template === 'cv4' && component === 'technicalskills')
        return preview(template);
    else if (template === 'cv9' && component === 'certificates')
        return '/buildcv/achievement';
    else if (template === 'cv9' && component === 'achievement')
        return preview(template);
    else if (template === 'cv7' && component === 'certificates')
        return 'buildcv/membership';
    else if (template === 'cv7' && component === 'membership')
        return preview(template);
    else if (template === 'cv2' && component === 'certificates')
        return 'buildcv/membership';
    else if (template === 'cv2' && component === 'membership')
        return '/buildcv/reference';
    else if (template === 'cv2' && component === 'reference')
        return preview(template);
    else if (template === 'cv1' && component === 'certificates')
        return '/buildcv/othertraining';
    else if (template === 'cv1' && component === 'othertraining')
        return preview(template);
    else return preview(template);
}