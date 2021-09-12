export const Footer = () => {
  return (
    <div className="py-8 bg-white border-t border-gray-200">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex justify-between">
          <div>
            <a href={"https://waynewee.com"} className="font-medium">
              waynewee.com
            </a>
          </div>
          <div className="text-sm">
            <b>Disclaimer:</b> This site was developed for fun and not intended
            to be an actual fundraising platform
          </div>
        </div>
      </div>
    </div>
  );
};
